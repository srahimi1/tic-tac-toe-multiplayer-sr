class Game < ApplicationRecord

	def self.is_game_over(gameId)
		@game = Game.find(gameId)
		indexes = {"X" => 0, "O" => 1}
		return winner_is( create_arrays(@game.game_pieces, indexes) )
	end

	def self.winner_is(arrays)
		totals = [0,0]
		24.times do |x|
			if (x % 3 == 0)
				totals[0] = 0
				totals[1] = 0
			end
			if (arrays[0][x] == 1)
				totals[0] += 1
			end
			if (arrays[1][x] == 1)
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

	def self.create_arrays(pieces_temp, indexes)
		arrays = [Array.new(24,0),Array.new(24,0)]
		pieces = pieces_temp.split(' ')
		pieces.each do |x|			
			piece = x.split(',')
			arrays[ indexes[ piece[1].to_s ] ][ piece[0].to_i ] = 1
			case piece[0].to_i
				when 0
					arrays[ indexes[ piece[1].to_s ] ][ 9 ] = 1
					arrays[ indexes[ piece[1].to_s ] ][ 15 ] = 1
				when 1
					arrays[ indexes[ piece[1].to_s ] ][ 18 ] = 1
				when 2
					arrays[ indexes[ piece[1].to_s ] ][ 14 ] = 1
					arrays[ indexes[ piece[1].to_s ] ][ 21 ] = 1
				when 3
					arrays[ indexes[ piece[1].to_s ] ][ 16 ] = 1
				when 4
					arrays[ indexes[ piece[1].to_s ] ][ 10 ] = 1
					arrays[ indexes[ piece[1].to_s ] ][ 13 ] = 1
					arrays[ indexes[ piece[1].to_s ] ][ 19 ] = 1
				when 5
					arrays[ indexes[ piece[1].to_s ] ][ 22 ] = 1
				when 6
					arrays[ indexes[ piece[1].to_s ] ][ 12 ] = 1
					arrays[ indexes[ piece[1].to_s ] ][ 17 ] = 1
				when 7
					arrays[ indexes[ piece[1].to_s ] ][ 20 ] = 1
				when 8
					arrays[ indexes[ piece[1].to_s ] ][ 11 ] = 1
					arrays[ indexes[ piece[1].to_s ] ][ 23 ] = 1
			end	
		end
		return arrays
	end





end