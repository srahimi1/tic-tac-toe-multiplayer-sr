class CreateGamesTable < ActiveRecord::Migration[5.0]
  def change
    create_table :games_tables do |t|
   	t.string :user1_id
   	t.string :user2_id
   	t.string :status
   	t.string :game_pieces
   	t.timestamps


    end
  end
end
