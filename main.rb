require 'newrelic_rpm'
require 'haml'
require 'sinatra'
require 'barista'
require_relative 'lib/cv'

class App < Sinatra::Application
  register Barista::Integration::Sinatra
  get '/' do
    CV::Command.load_all
    haml :index
  end

  get '/run/:command' do
    CV::Command.run params[:command], params[:args]
  end
end
