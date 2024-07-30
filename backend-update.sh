#!/bin/bash

WORK_DIR=/srv/linetracer-counter
TMP_DIR=${WORK_DIR}/_tmp/backend
BUILD_DIR=${WORK_DIR}/build/backend

cd      ${WORK_DIR}                                                         &&
sudo    rm -rf ${WORK_DIR}/_tmp                                             &&
sudo    git clone https://github.com/J93es/linetracer-counter.git _tmp      && 
cd      ${TMP_DIR}                                                          &&
sudo    cp ${WORK_DIR}/env/backend-env ${TMP_DIR}/.env                      &&
sudo    npm install                                                         && 
sudo    npm run build                                                       && 
sudo    rm -rf ${BUILD_DIR}/*                                               &&
sudo    mv ${TMP_DIR}/* ${BUILD_DIR}                                        &&
cd      ${BUILD_DIR}                                                        &&
sudo    pm2 stop linetracer-counter-backend                                 ;
sudo    pm2 delete linetracer-counter-backend                               ;
sudo    pm2 start npm --name "linetracer-counter-backend" -- start          &&
sudo    pm2 save                                                            &&
sudo    rm -rf ${WORK_DIR}/_tmp                                             &&
sudo    systemctl restart nginx