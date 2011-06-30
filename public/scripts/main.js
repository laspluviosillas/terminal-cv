/* DO NOT MODIFY. This file was compiled Thu, 30 Jun 2011 17:04:49 GMT from
 * /Users/jstrong/webapps/sam-terminal/public/coffeescripts/main.coffee
 */

(function() {
  var Console, DOWN, ENTER, InputController, UP;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  ENTER = 13;
  DOWN = 40;
  UP = 38;
  Console = (function() {
    function Console() {}
    Console.view = null;
    Console.input = null;
    Console.user = 'guest@sam-cv:/$ ';
    Console.command_history = [];
    Console.command_history_pointer = 0;
    Console.execute_command = function(command, args) {
      this.view.append(this.input.command() + '<br />');
      this.input.set_command(this.user);
      if (command === '' || command === null) {
        return;
      }
      return $.get('run/' + command, 'args=' + args, __bind(function(command_output) {
        var command_ouput;
        command_ouput = command_output.replace(/\n/g, '<br />');
        this.view.append(command_output + "<br />");
        return this.scrollToBottom();
      }, this));
    };
    Console.add_history = function(input) {
      return this.command_history.push(input);
    };
    Console.scrollToBottom = function() {
      return $(window).scrollTop($(document).height());
    };
    return Console;
  })();
  InputController = (function() {
    InputController.prototype.view = null;
    function InputController(view) {
      this.view = view;
      this.create_bindings();
    }
    InputController.prototype.create_bindings = function() {
      this.view.bind('keyup', __bind(function(e) {
        if (e.keyCode === ENTER) {
          return this.enter(e);
        }
      }, this));
      return this.view.bind('keydown', __bind(function(e) {
        if (e.keyCode === DOWN) {
          return this.down(e);
        }
        if (e.keyCode === UP) {
          return this.up(e);
        }
        return this.reset_caret_position(e);
      }, this));
    };
    InputController.prototype.reset_caret_position = function(e) {
      var caret_position;
      caret_position = this.caret_position();
      if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 37) {
        caret_position -= 1;
      }
      if (caret_position < Console.user.length) {
        return false;
      }
    };
    InputController.prototype.enter = function(e) {
      var args, command, input;
      input = this.view.val().substring(Console.user.length);
      Console.add_history(input);
      command = input.replace(/^(\w+).*/, '$1');
      args = input.substring(command.length);
      Console.execute_command(command, args);
      return Console.command_history_pointer = Console.command_history.length;
    };
    InputController.prototype.up = function(e) {
      var length;
      if (Console.command_history_pointer > 0) {
        Console.command_history_pointer -= 1;
        this.view.val(user + Console.command_history[Console.command_history_pointer]);
        length = this.view.val().length;
        setCaretPosition(document.getElementById('console_input'), length);
      }
      return false;
    };
    InputController.prototype.down = function(e) {
      if (Console.command_history_pointer + 1 < Console.command_history.length) {
        Console.command_history_pointer += 1;
        this.view.val(user + Console.command_history[Console.command_history_pointer]);
      } else {
        this.view.val(user);
      }
      return false;
    };
    InputController.prototype.set_command = function(command) {
      return this.view.val(command);
    };
    InputController.prototype.command = function() {
      return this.view.val();
    };
    InputController.prototype.caret_position = function() {
      return getCaretPosition(document.getElementById('console_input'));
    };
    return InputController;
  })();
  $(document).ready(function() {
    Console.view = $('#console');
    Console.input = new InputController($('#console_input'));
    $(document).bind('click', function(e) {
      return $('#console_input').focus();
    });
    $('#console_input').val(Console.user);
    return $('#console_input').focus();
  });
}).call(this);
