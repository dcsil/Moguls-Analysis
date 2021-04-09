# Moguls Analysis by X Tech


This is a repository for our Moguls Analysis web app which is available at https://moguls-analysis.herokuapp.com/

### Workflow Status
[![Backend Server CI](https://github.com/dcsil/Moguls-Analysis/actions/workflows/python-app.yml/badge.svg?branch=master)](https://github.com/dcsil/Moguls-Analysis/actions/workflows/python-app.yml)
[![Front-end CI](https://github.com/dcsil/Moguls-Analysis/actions/workflows/front-end.yml/badge.svg?branch=master)](https://github.com/dcsil/Moguls-Analysis/actions/workflows/front-end.yml)

### About Our Product
Our software is a video analysis tool for moguls skiing. 

Accuracy is an important aspect of sports performance, so we want to save time and improve efficiency for trainers by extracting key body metrics from key moments in videos.

Highlights:

- video drag-n-drop uploading
- video playing online
- algorithm for extracting body metrics based on pose estimation
- data saving with tags
- data sorting with arbitrary attributes
- data filtering with arbitrary attributes
- user account registration and login
- cookie and session for saving authentication status


Not fully implemented yet:
- algorithm for event detection (to find the correct moment that the skiing board leaves the ramp in the video)


### Demo Video
[Link to the Demo Video](https://youtu.be/RxU_x1gVL6Q)

### Setup

#### Bootstrap
Run `/script/bootstrap` and this script will de the develop environment setup and the setup for the app.

#### Develop Environment Setup
Run `/script/env_setup` and this script will install all requirements for this app.

#### Application Specific Setup
Run `/script/app_setup` and the app will be ready for run.

#### Run the App
Run the `app.py` file in the root directory using python 3 and this will start the server. Please make sure that develop environment setup and application specific setup are completed before run this script.  

#### Run All Tests 
Run `/script/run_tests` and this will run all avaliable tests on this app both frontend and backend. Please make sure that develop environment setup and application specific setup are completed before run this script.  