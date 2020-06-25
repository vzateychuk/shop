import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { Product, ProductModel, Category } from 'src/app/shared';

import { ProductService } from '../product.service';

const product: Product = new ProductModel('sku', 'name', Category.Durable, 1, 1.99);
const updatedProduct: Product = new ProductModel('sku-another', 'another-product', Category.Nondurable, 1, 1.99);
const productList: Array<Product> = [ product ];

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ProductService ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    /**
     * В конце вызываем метод verify() HttpTestingController
     * чтобы убедиться, что никакие запросы больше не исходят
     */
    httpMock.verify();
  });

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProducts() should return products list', (done: DoneFn) => {
    service.getProducts().then(result => {
      expect(result).toBe(productList);
      done();
    });

    const mockRequest = httpMock.expectOne(service.baseUrl);

    /** Настраиваем проверки */
    expect (mockRequest.cancelled).toBeFalsy(); //  Проверим что запрос не был отменен
    expect(mockRequest.request.responseType).toEqual('json'); // проверяем что запросили json
    expect(mockRequest.request.method).toEqual('GET'); // проверяем что тип запроса - GET

    // Запрос в ожидании, и пока ответ не отправляется.
    // Чтобы запустить цепочку запрос-ответ, нужно выполнить mockRequest.flush
    mockRequest.flush(productList); // mockResponse contains fake data
  });

  it('getProducts() should handle http error', (done: DoneFn) => {
    service.getProducts().catch(err => {
      expect(err).toBe('Http failure response for http://localhost:3000/products: 0 ');
      done();
    });

    const mockRequest = httpMock.expectOne(service.baseUrl);

    mockRequest.error(new ErrorEvent('Error happend')); // mockResponse contains fake data
  });

  it('getProduct(sku) should return product', (done: DoneFn) => {
    service.getProduct(product.sku).then(result => {
      expect(result).toBe(product);
      done();
    });

    const productUrl = `${service.baseUrl}/${product.sku}`;
    const mockRequest = httpMock.expectOne(productUrl);

    expect (mockRequest.cancelled).toBeFalsy(); //  Проверим что запрос не был отменен
    expect(mockRequest.request.responseType).toEqual('json'); // проверяем что запросили json
    expect(mockRequest.request.method).toEqual('GET'); // проверяем что тип запроса - GET
    mockRequest.flush(product); // mockResponse contains fake data
  });

  it('updateProduct(product) should return updated product', (done: DoneFn) => {
    service.updateProduct(product).then(result => {
      expect(result).toBe(updatedProduct);
      done();
    });

    const productUrl = `${service.baseUrl}/${product.sku}`;
    const mockRequest = httpMock.expectOne(productUrl);

    expect (mockRequest.cancelled).toBeFalsy(); //  Проверим что запрос не был отменен
    expect(mockRequest.request.responseType).toEqual('json'); // проверяем что запросили json
    expect(mockRequest.request.method).toEqual('PUT'); // проверяем что тип запроса - PUT
    mockRequest.flush(updatedProduct); // mockResponse contains fake data
  });

  it('createProduct(product) should invoke http.POST & return created product', (done: DoneFn) => {
    service.createProduct(product).then(result => {
      expect(result).toBe(product);
      done();
    });

    const mockRequest = httpMock.expectOne(service.baseUrl);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    expect(mockRequest.request.method).toEqual('POST');
    mockRequest.flush(product);
  });

  it('deleteProduct(product) should invoke http.delete & return deleted', (done: DoneFn) => {
    service.deleteProduct(product).then(result => {
      expect(result).toBe(product);
      done();
    });

    const deleteUrl = `${service.baseUrl}/${product.sku}`;
    const mockRequest = httpMock.expectOne(deleteUrl);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    expect(mockRequest.request.method).toEqual('DELETE');
    mockRequest.flush(product);
  });

  it('addToCard(product) should update the product', (done: DoneFn) => {
    service.addToCard(product, 1).then(result => {
      expect(result).toBe(updatedProduct);
      done();
    });

    const productUrl = `${service.baseUrl}/${product.sku}`;
    const mockRequest = httpMock.expectOne(productUrl);

    expect (mockRequest.cancelled).toBeFalsy(); //  Проверим что запрос не был отменен
    expect(mockRequest.request.responseType).toEqual('json'); // проверяем что запросили json
    expect(mockRequest.request.method).toEqual('PUT'); // проверяем что тип запроса - PUT
    mockRequest.flush(updatedProduct); // run the test. mock contains fake data
  });

  it('addToCard returns error when no products available', (done: DoneFn) => {
    const amount = product.amountAvailable + 1;
    // const amount = 5;
    service.addToCard(product, amount).catch(err => {
      expect(err).toBe('Not enough product');
      done();
    });
  });
});
