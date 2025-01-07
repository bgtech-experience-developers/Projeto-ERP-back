# !/bin/bash
$DB_USER="root"
$DB_PASSWORD="1234"
$DB_NAME="teste"
$BACKUP_DIR="./backup"
$DATA_HORA=`date +%Y%m%d%H%M%S`
# Criar diretório de backup se não existir
# mkdir -p "$BACKUP_DIR"
mysqldump -u $DB_USER -p $DB_PASSWORD $DB_NAME > "./backup/lo.sql"
# $EmailFrom = "lucassilvadpaula@gmail.com"
# $EmailTo = "dpaulanaoki@gmail.com"
# $SMTPUsername = "lucassilvadpaula@gmail.com"
# $SMTPPassword = "nfik drbk bobc advl"
# $password = ConvertTo-SecureString "nfik drbk bobc advl" -AsPlainText -Force
# $cred = New-Object Management.Automation.PSCrendial($SMTPUsername,$password)
# $Subject = "backup concluido"
# $Body = "Backup concluído com sucesso."
# $SMTPServer = "smtp.gmail.com"
# $SMTPPort = 465
echo "Backup concluído: $BACKUP_DIR/$DB_NAME-$DATA_HORA.sql" 

# Send-MailMessage -From $EmailFrom -To $EmailTo -Subject $Subject -Body $Body -SmtpServer $SMTPServer -Credential $cred -verbose -UseSsl
# Executar o mysqldump
