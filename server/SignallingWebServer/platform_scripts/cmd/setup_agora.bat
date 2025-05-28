@Rem Copyright Epic Games, Inc. All Rights Reserved.

@Rem Set script location as working directory for commands.
pushd %~dp0\..\..\
echo Agora Downloading...
call npm install agora-access-token

@Rem Pop working directory
popd