# Simple variables for keycodes - improves code readability.
ENTER = 13
DOWN = 40
UP = 38

# Static class since there is only one console.
# Possibly ould be a singleton
class Console
  @view: null
  @input: null
  
  @user: 'guest@sam-cv:/$ '
  # These two variables will be for up/down scrolling through
  # commands. Terminal style, baby 8-)  
  @command_history: []
  @command_history_pointer: 0

  @execute_command: (command, args) ->
    @view.append @input.command() + '<br />'
    @input.set_command @user
    # if the command is null or empty, return.
    return if command == '' or command == null

    $.get 'run/' + command, 'args=' + args, (command_output) =>
    	#nl2br on the command output
    	command_ouput = command_output.replace /\n/g, '<br />'

    	# append command output to screen
    	@view.append command_output + "<br />"
    	@scrollToBottom()
  
  @add_history: (input) ->
    @command_history.push input
    
  @scrollToBottom: ->
    $(window).scrollTop $(document).height()

  
# Input controller.
class InputController
  view: null
  
  constructor: (view) ->
    @view = view
    # Set up key bindings for the input.
    @create_bindings()
  
  create_bindings: ->
    @view.bind 'keyup', (e) =>
      if e.keyCode is ENTER
        @enter(e)
      
    @view.bind 'keydown', (e) =>      
      return @down(e) if e.keyCode is DOWN
      return @up(e) if e.keyCode is UP
      return @reset_caret_position(e)
  
  reset_caret_position: (e) ->
    # This code insures that nothing happens to the user text
    # at the start of each command
    caret_position = @caret_position()
    # Compensate for when the character pressed is either delete,
    # backspace or left.
    if e.keyCode == 8 or e.keyCode == 46 or e.keyCode == 37
      caret_position -= 1

    if(caret_position < Console.user.length)
      return false    
        
  # -- Keyboard actions --
  enter: (e) ->    
    input = @view.val().substring Console.user.length
    # Add the command to the navigable command history
    Console.add_history input

    # split the command into command and args
    command = input.replace /^(\w+).*/, '$1'
    args = input.substring command.length

    # execute the command
    Console.execute_command command, args

    # set the command history pointer to the most recent command
    Console.command_history_pointer = Console.command_history.length    
    
  up: (e) ->
    # keyboard up
    if Console.command_history_pointer > 0
      Console.command_history_pointer -= 1
      @view.val user + Console.command_history[Console.command_history_pointer]
      # the caret jumps to the start when the up key is pressed,
      # this moves it back to the end.
      length = @view.val().length
      setCaretPosition document.getElementById('console_input'), length

    # stop the event bubbling
    return false
        
  down: (e) ->
    # keyboard down
    if Console.command_history_pointer + 1 < Console.command_history.length
      Console.command_history_pointer += 1
      @view.val user + Console.command_history[Console.command_history_pointer]
    else
      @view.val user

    # stop the event bubbling
    false  
    
  # -- Getters and Setters --
  # Set input command (just val(value) on the view for the time being)
  set_command: (command) ->
    @view.val command
    
  # Returns the command value (just val() on the view)
  command: ->
    @view.val() 
    
  caret_position: ->
     getCaretPosition document.getElementById('console_input')
  

$(document).ready ->
  # Set console view
  Console.view = $('#console')
  # Set the input to a new input controller instance.
  Console.input = new InputController $('#console_input')
					
  # To make the text box easier to find, focus it wherever you click.
  $(document).bind 'click', (e) ->
    $('#console_input').focus()

  $('#console_input').val Console.user
  # give focus to the input
  $('#console_input').focus()    
