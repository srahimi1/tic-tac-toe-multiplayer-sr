class Game < ApplicationRecord



	def self.is_game_over(gameId)
		@game = Game.find(gameId)
		indexes = {"X" => 0, "O" => 1}
		array_values = [Array.new(24,0),Array.new(24,0)] 
		totals = [0,0]
		pieces = @game.game_pieces.split(' ')
		pieces.each do |x|			
			piece = x.split(',')
			array_values[ indexes[ piece[1].to_s ] ][ piece[0].to_i ] = 1
			case piece[0].to_i
				when 0
					array_values[ indexes[ piece[1].to_s ] ][ 9 ] = 1
					array_values[ indexes[ piece[1].to_s ] ][ 15 ] = 1
				when 1
					array_values[ indexes[ piece[1].to_s ] ][ 18 ] = 1
				when 2
					array_values[ indexes[ piece[1].to_s ] ][ 14 ] = 1
					array_values[ indexes[ piece[1].to_s ] ][ 21 ] = 1
				when 3
					array_values[ indexes[ piece[1].to_s ] ][ 16 ] = 1
				when 4
					array_values[ indexes[ piece[1].to_s ] ][ 10 ] = 1
					array_values[ indexes[ piece[1].to_s ] ][ 13 ] = 1
					array_values[ indexes[ piece[1].to_s ] ][ 19 ] = 1
				when 5
					array_values[ indexes[ piece[1].to_s ] ][ 22 ] = 1
				when 6
					array_values[ indexes[ piece[1].to_s ] ][ 12 ] = 1
					array_values[ indexes[ piece[1].to_s ] ][ 17 ] = 1
				when 7
					array_values[ indexes[ piece[1].to_s ] ][ 20 ] = 1
				when 8
					array_values[ indexes[ piece[1].to_s ] ][ 11 ] = 1
					array_values[ indexes[ piece[1].to_s ] ][ 23 ] = 1
			end	
		end
		24.times do |x|
			if (x % 3 == 0)
				totals[0] = 0
				totals[1] = 0
			end
			if (array_values[0][x] == 1)
				totals[0] += 1
			end
			if (array_values[1][x] == 1)
				totals[1] += 1
			end	
			if (totals[0] == 3)
				return "X"
			elsif (totals[1] == 3)
				return "O"	
			end
		end
		return "Z"
	end


end