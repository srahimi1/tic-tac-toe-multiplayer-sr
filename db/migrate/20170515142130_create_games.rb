class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
   	t.string :user1_id
   	t.string :user2_id
   	t.string :user1_letter
   	t.string :user2_letter
   	t.string :status
   	t.string :game_pieces
   	t.timestamps
    end
  end
end
