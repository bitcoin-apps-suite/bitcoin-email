#!/usr/bin/osascript

-- Toggle Bitcoin Email Server on port 1040
-- If running: stops the server
-- If not running: starts the server and opens browser

on run
	try
		-- Check if server is running on port 1040
		set serverRunning to false
		try
			set pid to do shell script "lsof -ti:1040"
			if pid is not "" then
				set serverRunning to true
			end if
		end try
		
		if serverRunning then
			-- Server is running, so stop it
			do shell script "kill -9 " & pid
			
			display notification "Bitcoin Email server on port 1040 has been stopped" with title "Bitcoin Email" subtitle "Server Stopped" sound name "Pop"
			
		else
			-- Server is not running, so start it
			display notification "Starting Bitcoin Email server on port 1040..." with title "Bitcoin Email" subtitle "Starting Server" sound name "Pop"
			
			-- Navigate to the project directory and start the server
			do shell script "cd '/Volumes/Extreme SSD/Projects/bitcoin-email' && nohup npm run dev -- -p 1040 > /dev/null 2>&1 &"
			
			-- Wait for server to start
			delay 4
			
			-- Check if server started successfully
			set checkServer to do shell script "lsof -ti:1040 || echo 'failed'"
			
			if checkServer is not "failed" then
				-- Open the browser
				do shell script "open http://localhost:1040"
				display notification "Bitcoin Email server is running on port 1040" with title "Bitcoin Email" subtitle "Server Started" sound name "Glass"
			else
				display notification "Failed to start server. Check terminal for errors." with title "Bitcoin Email" subtitle "Start Failed" sound name "Basso"
			end if
		end if
		
	on error errMsg
		display notification "Error: " & errMsg with title "Bitcoin Email" subtitle "Error" sound name "Basso"
	end try
end run