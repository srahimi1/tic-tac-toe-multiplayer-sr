class GamesController < ApplicationController

	@@current_count = 0

	def new
		@game = Game.new(:user1_id => "A", :user2_id => "B")
		@game.save
		render plain: @game.id
	end


	def update
		@game = Game.find(params[:id])
		@game.user1_letter = params[:letter]
		if (@game.user1_letter == "x" || @game.user1_letter == "X")
				@game.user2_letter = "O"
		else @game.user2_letter = "X"
		end
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
		head :ok
	end


	def show
		@game = Game.find(params[:id])
		if (params[:player] == "1")
			@game_piece = @game.user1_letter
		else
			@game_piece = @game.user2_letter
		end
			render plain: "retry: 1000\n\ndata: #{@game.id}q#{@game_piece}q#{@game.game_pieces}\n\n", :content_type => "text/event-stream"
	end

end
