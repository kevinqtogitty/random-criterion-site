class FilmsController < ApplicationController
  def index
    @total_films = Film.count
    @films = Film.order("RANDOM()").limit(10)
  end
end
