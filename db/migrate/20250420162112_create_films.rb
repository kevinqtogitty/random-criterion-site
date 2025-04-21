class CreateFilms < ActiveRecord::Migration[8.0]
  def change
    create_table :films do |t|
      t.string :title
      t.string :director
      t.string :country
      t.integer :year
      t.string :link
      t.string :img_url

      t.timestamps
    end
  end
end
