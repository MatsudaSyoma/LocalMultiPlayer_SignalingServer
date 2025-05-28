@echo off
chcp 65001
start powershell -ExecutionPolicy RemoteSigned -File "\SignallingWebServer\platform_scripts\cmd\Start_SignallingServer.ps1"
