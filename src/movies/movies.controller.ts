import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService){}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') movieId: number) {
        const movie = this.moviesService.getOne(movieId)
        if (movie) {
            return movie
        }
        throw new NotFoundException(`Фильм с id: ${movieId} не найден`)
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        this.moviesService.create(movieData )
    }

    @Delete(':id')
    remove(@Param('id') movieId: number) {
        return this.moviesService.remove(movieId)
    }

    @Patch(':id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
        return this.moviesService.patch(movieId, updateData)
    }
}
