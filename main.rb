require 'newrelic_rpm'
require 'haml'
require 'sinatra'
require_relative 'lib/cv'

get '/' do
  CV::Command.load_all
  haml :index
end

get '/run/:command' do
  CV::Command.run params[:command], params[:args]
end
