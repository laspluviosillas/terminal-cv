require 'newrelic_rpm'
require 'haml'
require 'sinatra'
require_relative 'lib/cv'

get '/' do
  haml :index
end
