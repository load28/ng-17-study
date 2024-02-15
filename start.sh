#!/bin/bash

# 4200번 포트를 사용하는 프로세스 찾기
PID=$(lsof -t -i:4200)

# 해당 프로세스가 존재하는 경우 종료
if [ ! -z "$PID" ]; then
  echo "Killing process on port 4200 with PID: $PID"
  kill -9 $PID
fi

# 특정 스크립트 실행
echo "Running the script..."
npm run start

# 스크립트 실행 완료 메시지
echo "Script executed successfully."

