@echo off
setlocal

if not DEFINED IS_MINIMIZED set IS_MINIMIZED=1 && start "" /min "%~dpnx0" %* && exit

title React Controller App

serve C:\Repo\meadowlark\ts-cam-app-Meadowlark\build

endlocal

