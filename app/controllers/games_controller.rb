class GamesController < ApplicationController


	def new
		@game = Game.new(:user1_id => "A", :user2_id => "B")
		@game.save
		render plain: @game.id
	end


	def update
		@game = Game.find(params[:id])
		@game.user1_letter = params[:letter]
		@game.save
		render plain: @game.user1_letter
	end

	def play
		@game = Game.find(params[:id])
		if (@game.game_pieces.blank?)
			@game.game_pieces = "cell_#{params[:rowcol]},#{params[:letter]}"
			@game.save
		else
			@game.game_pieces = "#{@game.game_pieces} cell_#{params[:rowcol]},#{params[:letter]}"
			@game.save
		end
		render plain: @game.game_pieces
	end


	def show
		@game = Game.find(params[:id])
		if (@game.user2_letter.blank?)
			if (@game.user1_letter == "x" || @game.user1_letter == "X")
				@game.user2_letter = "O"
			else @game.user2_letter = "X"
			end
		@game.save
		end
		render plain: "#{@game.id}q#{@game.user2_letter}q#{@game.game_pieces}"
	end
end
