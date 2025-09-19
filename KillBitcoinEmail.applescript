#!/usr/bin/osascript

-- Kill Bitcoin Email on port 1040
-- This script kills any process running on port 1040

on run
	try
		-- Get the process ID using port 1040
		set pid to do shell script "lsof -ti:1040" 
		
		if pid is not "" then
			-- Kill the process
			do shell script "kill -9 " & pid
			
			-- Show notification
			display notification "Bitcoin Email server on port 1040 has been stopped" with title "Bitcoin Email" subtitle "Server Stopped" sound name "Pop"
		else
			display notification "No server running on port 1040" with title "Bitcoin Email" subtitle "Nothing to stop" sound name "Tink"
		end if
		
	on error errMsg
		-- No process found on port 1040
		display notification "No server running on port 1040" with title "Bitcoin Email" subtitle "Nothing to stop" sound name "Tink"
	end try
end run