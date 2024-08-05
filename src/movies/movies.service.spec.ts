import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { after } from 'node:test';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Тестирование функции getAll', () => {

    it('Должен возвращаться массив', () => {
      const result = service.getAll()
      expect(result).toBeInstanceOf(Array)
    })
  });

  describe('Тестирование функции getOne', () => {
    it('Должен возвращаться фильм', () => {
      service.create({
        title: 'Testing movie',
        genres: ['test'],
        year: 2024
      })
      const result = service.getOne(1)
      expect(result).toBeDefined()
    })

    it('Должен возвращаться 404 ошибка', () => {
      try {
        const result = service.getOne(945)
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }

    })
  })

  describe('Тестирование функции create', () => {
    it('Должен возвращаться id фильма', () => {
      const beforeCreate = service.getAll().length
      service.create({
        title: 'Testing movie',
        genres: ['test'],
        year: 2024
      })
      const afterCreate = service.getAll().length
      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })
  })

  describe('Тестирование функции patch', () => {
    it('Должен возвращаться Update data', () => {
      service.create({
        title: 'Testing movie',
        genres: ['test'],
        year: 2024
      })
      service.patch(1, { title: 'Update data' })
      const movie = service.getOne(1)
      expect(movie.title).toEqual('Update data')
    })
  })

})
