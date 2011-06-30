require './main'

Barista.configure do |c|
  c.root =        'public/coffeescripts'
  c.output_root = 'public/scripts'
  c.verbose = false
end

use Rack::Reloader
run App
