require 'newrelic_rpm'
require 'sinatra'
require_relative 'lib/cv'

get '/' do
  'Hello, world!'
end
