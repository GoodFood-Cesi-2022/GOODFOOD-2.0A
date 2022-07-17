import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { mockUserArray } from '../../mock/users.mock';

import { SidebarService } from './sidebar.service';

fdescribe('SidebarStoreService', () => {
  let service: SidebarService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [SidebarService],
    });

    service = TestBed.inject(SidebarService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open the sidebar', () => {
    service.open(true);
    expect(service).toBeTruthy();
  });

  it('should close the sidebar', () => {
    service.open(false);
    expect(service).toBeTruthy();
  });

  describe('getUsers()', () => {
    beforeEach(() => {
      service = TestBed.inject(SidebarService);
    });

    it('shoud get all the users', () => {
      service.getUsers().subscribe({
        next: (values) =>
          expect(values)
            .withContext('shoud return all the Users')
            .toEqual({ data: mockUserArray }),
        error: fail,
      });

      /* RecipeService should have made one request to GET recipes from expected URL */
      const req = httpTestingController.expectOne(
        `${environment.apiBaseUrl}/users`
      );
      expect(req.request.method).toBe('GET');
      // Respond with the mock recipes
      req.flush({ data: mockUserArray });
    });
  });
});
