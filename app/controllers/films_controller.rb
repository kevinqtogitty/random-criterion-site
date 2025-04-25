class FilmsController < ApplicationController
  def index
    @total_films = Film.count

    # Get the limit from params, default to 10 if not provided
    # Only allow specific values: 1, 3, 5, or 10
    allowed_counts = [ 1, 3, 5, 10 ]
    requested_count = params[:count].to_i
    @limit = allowed_counts.include?(requested_count) ? requested_count : 10

    @films = Film.order("RANDOM()").limit(@limit)
  end
end
