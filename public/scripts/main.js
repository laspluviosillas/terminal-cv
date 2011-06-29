// These two variables will be for up/down scrolling through
// commands. Terminal style, baby 8-)
var command_history = new Array();
var command_history_pointer = 0;

function scrollToBottom() {
    $(window).scrollTop($(document).height());
}

function executeCommand(command, args) {
    $('#console').append($('#console_input').val() + '<br />');
    $('#console_input').val('');
    $.get('run/' + command, 'args=' + args, function(command_output) {
        // nl2br on the command output
        command_output = command_output.replace(/\n/g, '<br />');

        // append command output to screen
        $('#console').append(command_output + "<br />");
        scrollToBottom();
    });
}

$(document).ready(function() {
    $('#console_input').bind('keyup', function(e) {
        // If the enter key is pressed (keycode 13)
        if (e.keyCode == 13) {
            var input = $('#console_input').val();

            // Add the command to the navigable command history
            command_history.push(input);

            // split the command into command and args
            var command = input.replace(/^(\w+).*/, '$1');
            var args = input.substring(command.length);

            // execute the command
            executeCommand(command, args);

            // set the command history pointer to the most recent command.
            command_history_pointer = command_history.length;
        }

        // stop the event from bubbling up
        return false;
    });

    $('#console_input').bind('keydown', function(e) {
        if (e.keyCode == 40) {
            // keyboard down
            if (command_history_pointer < command_history.length) {
                command_history_pointer += 1;
                $('#console_input').val(command_history[command_history_pointer]);
            } else {
                $('#console_input').val('');
            }

            // stop the event bubbling
            return false;
        } else if (e.keyCode == 38) {
            // keyboard up
            if (command_history_pointer > 0) {
                command_history_pointer -= 1;
                $('#console_input').val(command_history[command_history_pointer]);

                // the caret jumps to the start when the up key is pressed,
                // this moves it back to the end.
                var length = $('#console_input').val().length;
                setCaretPosition(document.getElementById('console_input'), length);
            }

            // stop the event bubbling
            return false;
        }
    });

    // give focus to the input
    $('#console_input').focus();
});
