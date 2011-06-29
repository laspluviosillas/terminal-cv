module CV
  class Command
    def self.commands
      @@commands ||= {}
    end

    def self.add name, &block
      commands[name] = block
    end

    def self.run name, args
      if commands.key? name
        commands[name].call args
      else
        name + ": command not found"
      end
    end

    def self.load_all
      Dir['bin/*.rb'].each do |file|
        require File.absolute_path file
      end
    end
  end
end
