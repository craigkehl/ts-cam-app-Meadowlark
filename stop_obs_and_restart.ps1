# Stop the virtual camera in OBS
$obsPath = "C:\Program Files\obs-studio\bin\64bit\obs64.exe"
$obsArgs = "--stopvirtualcam"
Start-Process -FilePath $obsPath -ArgumentList $obsArgs

# Wait for a moment to ensure the virtual camera stops
Start-Sleep -Seconds 3

# Stop recording if it is active
$obsArgs = "--stoprecording"
Start-Process -FilePath $obsPath -ArgumentList $obsArgs

# Wait for a moment to ensure the recording stops
Start-Sleep -Seconds 3

# Close OBS gracefully
Stop-Process -Name "obs64" -Force

# Close any other open programs (example: Notepad and Calculator)
Stop-Process -Name "notepad" -Force
Stop-Process -Name "calc" -Force

# Restart the computer
Restart-Computer -Force