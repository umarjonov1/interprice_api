import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll() {
        return this.movies;
    }

    getOne(id: number): Movie {
        const movie = this.movies.find((movie) => movie.id === id)
        if (movie) {
            return movie
        }
        throw new NotFoundException(`Фильм с id: ${id} не найден`)
    }

    remove(id: number) {
        this.getOne(id)
        this.movies = this.movies.filter(movie => movie.id !== id)
    }

    create(movieData: CreateMovieDto) {
        return this.movies.push(
            {id: this.movies.length + 1, ...movieData})
    }

    patch(id, updateData: UpdateMovieDto) {
        const movie = this.getOne(id)
        this.remove(id)
        this.movies.push({ ...movie, ...updateData })
    }
}
