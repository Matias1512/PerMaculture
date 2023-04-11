import { TestBed } from '@angular/core/testing';

import { PlantsService } from './plants.service';

describe('PlantsService', () => {
  let service: PlantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of plants', () => {
    const plants = service.getPlants();
    expect(plants instanceof Array).toBe(true);
  });

  
});
