import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def handler(event: dict, context) -> dict:
    '''Отправка заявок с сайта на почту 108@okbssp.ru'''
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        data = json.loads(event.get('body', '{}'))
        
        name = data.get('name', '')
        phone = data.get('phone', '')
        email = data.get('email', '')
        message = data.get('message', '')
        to_email = data.get('to', '108@okbssp.ru')
        
        smtp_server = os.environ.get('SMTP_SERVER', 'smtp.yandex.ru')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        
        if not smtp_user or not smtp_password:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'SMTP not configured'})
            }
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новая заявка с сайта от {name}'
        msg['From'] = smtp_user
        msg['To'] = to_email
        
        html_content = f'''
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #FF4D00;">Новая заявка с сайта</h2>
            <p><strong>Имя:</strong> {name}</p>
            <p><strong>Телефон:</strong> {phone}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Сообщение:</strong></p>
            <p style="background: #f4f4f4; padding: 10px; border-radius: 5px;">{message}</p>
          </body>
        </html>
        '''
        
        msg.attach(MIMEText(html_content, 'html'))
        
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'message': 'Email sent successfully'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
