#!/bin/bash

export EXPO_IOS_DIST_P12_PASSWORD="House2Code"

expo build:ios \
	--team-id=8XRBD9JCMN \
	--dist-p12-path=~/Downloads/frigo-deployment/Certifikater.p12 \
	--provisioning-profile-path=~/Downloads/frigo-deployment/Frigo_Distribution_In_House.mobileprovision 

