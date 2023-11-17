::Copiar y pegar este archivo junto con los mails a la carpeta "volume\templates"

@echo off
echo Reemplazando mails...

move TPLNEW_TASK_POOL_GROUP-es.html tplmail\TPLNEW_TASK_POOL_GROUP\es
move TPLNEW_TASK-es.html tplmail\TPLNEW_TASK\es
move TPLOVERDUE_TASK_TO_GROUP-es.html tplmail\TPLOVERDUE_TASK_TO_GROUP\es
move TPLOVERDUE_TASK_TO_MANAGER-es.html tplmail\TPLOVERDUE_TASK_TO_MANAGER\es
move TPLOVERDUE_TASK_USER_RESPONSIBLE-es.html tplmail\TPLOVERDUE_TASK_USER_RESPONSIBLE\es
move TPLTASK_POOL_GROUP_ASSUMED-es.html tplmail\TPLTASK_POOL_GROUP_ASSUMED\es

echo Listo!
pause
