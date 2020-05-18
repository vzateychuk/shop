import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { Product, ProductModel, Category } from 'src/app/shared';

import { ProductService } from './product.service';

const productResponse: Product = new ProductModel('sku', 'name', Category.Durable, 1, 1.99);
const updatedProduct: Product = new ProductModel('sku-another', 'another-product', Category.Nondurable, 1, 1.99);
const productListResponse: Array<Product> = [ productResponse ];

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
      expect(result).toBe(productListResponse);
      done();
    });

    const mockRequest = httpMock.expectOne(service.baseUrl);

    /** Настраиваем проверки */
    expect (mockRequest.cancelled).toBeFalsy(); //  Проверим что запрос не был отменен
    expect(mockRequest.request.responseType).toEqual('json'); // проверяем что запросили json
    expect(mockRequest.request.method).toEqual('GET'); // проверяем что тип запроса - GET

    // Запрос в ожидании, и пока ответ не отправляется.
    // Чтобы запустить цепочку запрос-ответ, нужно выполнить mockRequest.flush
    mockRequest.flush(productListResponse); // mockResponse contains fake data
  });

  it('getProduct(sku) should return product', (done: DoneFn) => {
    service.getProduct(productResponse.sku).then(result => {
      expect(result).toBe(productResponse);
      done();
    });

    const productUrl = `${service.baseUrl}/${productResponse.sku}`;
    const mockRequest = httpMock.expectOne(productUrl);

    expect (mockRequest.cancelled).toBeFalsy(); //  Проверим что запрос не был отменен
    expect(mockRequest.request.responseType).toEqual('json'); // проверяем что запросили json
    expect(mockRequest.request.method).toEqual('GET'); // проверяем что тип запроса - GET
    mockRequest.flush(productResponse); // mockResponse contains fake data
  });

  it('updateProduct(product) should return updated product', (done: DoneFn) => {
    service.updateProduct(productResponse).then(result => {
      expect(result).toBe(updatedProduct);
      done();
    });

    const productUrl = `${service.baseUrl}/${productResponse.sku}`;
    const mockRequest = httpMock.expectOne(productUrl);

    expect (mockRequest.cancelled).toBeFalsy(); //  Проверим что запрос не был отменен
    expect(mockRequest.request.responseType).toEqual('json'); // проверяем что запросили json
    expect(mockRequest.request.method).toEqual('PUT'); // проверяем что тип запроса - PUT
    mockRequest.flush(updatedProduct); // mockResponse contains fake data
  });

  it('createProduct(product) should invoke http.POST & return created product', (done: DoneFn) => {
    service.createProduct(productResponse).then(result => {
      expect(result).toBe(productResponse);
      done();
    });

    const mockRequest = httpMock.expectOne(service.baseUrl);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    expect(mockRequest.request.method).toEqual('POST');
    mockRequest.flush(productResponse);
  });

  it('deleteProduct(product) should invoke http.delete & return deleted', (done: DoneFn) => {
    service.deleteProduct(productResponse).then(result => {
      expect(result).toBe(productResponse);
      done();
    });

    const deleteUrl = `${service.baseUrl}/${productResponse.sku}`;
    const mockRequest = httpMock.expectOne(deleteUrl);
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    expect(mockRequest.request.method).toEqual('DELETE');
    mockRequest.flush(productResponse);
  });

  xit('addToCard(...) should return error when no products available', (done: DoneFn) => {
    const toSell = productResponse.amountAvailable + 1;
    service.addToCard(productResponse, toSell).catch(err => {
      console.log(err);
      expect(err.statusText).toBe('Not enough product');
    });
  });
});
