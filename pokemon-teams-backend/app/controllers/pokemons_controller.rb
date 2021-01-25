require 'faker'

class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons, except: [:updated_at, :created_at]
    end

    def create
        pokemon = Pokemon.new
        pokemon.nickname = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        pokemon.trainer_id = pokemon_params[:trainer_id]
        pokemon.save
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: pokemon
    end

    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end
end
