@Rem Copyright Epic Games, Inc. All Rights Reserved.

@echo off

@Rem Set script location as working directory for commands.
pushd %~dp0\..\..\..\

echo Agora Downloading...
call platform_scripts\cmd\node\npm install agora-access-token

@Rem Pop working directory
popd