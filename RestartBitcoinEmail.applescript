#!/usr/bin/osascript

-- Restart Bitcoin Email on port 1040
-- This script kills any process on port 1040 and restarts the server

on run
	try
		-- First, try to kill any existing process on port 1040
		try
			set pid to do shell script "lsof -ti:1040"
			if pid is not "" then
				do shell script "kill -9 " & pid
				delay 1
			end if
		end try
		
		-- Show notification that we're restarting
		display notification "Starting Bitcoin Email server on port 1040..." with title "Bitcoin Email" subtitle "Restarting Server" sound name "Pop"
		
		-- Navigate to the project directory and start the server
		-- Using nohup to keep it running after the script exits
		do shell script "cd '/Volumes/Extreme SSD/Projects/bitcoin-email' && nohup npm run dev -- -p 1040 > /dev/null 2>&1 &"
		
		-- Wait a moment for the server to start
		delay 3
		
		-- Check if server started successfully
		set checkServer to do shell script "lsof -ti:1040 || echo 'failed'"
		
		if checkServer is not "failed" then
			-- Open the browser after a short delay
			delay 2
			do shell script "open http://localhost:1040"
			display notification "Bitcoin Email server is running on port 1040" with title "Bitcoin Email" subtitle "Server Started" sound name "Glass"
		else
			display notification "Failed to start server. Check terminal for errors." with title "Bitcoin Email" subtitle "Start Failed" sound name "Basso"
		end if
		
	on error errMsg
		display notification "Error: " & errMsg with title "Bitcoin Email" subtitle "Error" sound name "Basso"
	end try
end run