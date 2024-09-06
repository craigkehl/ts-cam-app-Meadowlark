@echo off

# Run the PowerShell script to stop OBS and restart the computer
powershell.exe -ExecutionPolicy Bypass -File "C:\Path\To\stop_obs_and_restart.ps1"

# Wait for the computer to restart
timeout /T 60 /NOBREAK

# Start the required applications after restart
Start C:\Repo\meadowlark\ts-cam-app-Meadowlark\servereact.bat
Start /d "C:\Program Files\obs-studio\bin\64bit" "" obs64.exe --startvirtualcam
timeout /T 3 /NOBREAK

Start C:\Users\sandy\AppData\Roaming\Zoom\bin\Zoom.exe
Timeout /T 5 /NOBREAK
Start C:\Repo\medowlark\CamCtrlServer-Meadolark\apistart.bat