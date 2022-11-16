import boto3
import os
import uuid


BUCKET_NAME=os.environ.get("AWS_BUCKET")
allowed_extension_file_types = {'jpg','jpeg','png'}
S3_location = f'https://{BUCKET_NAME}.s3.amazonaws.com/'

s3=boto3.client("s3",
    aws_access_key_id = os.environ.get("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
)

def extensions(filename):
    return '.' in filename and \
        filename.rsplit(".", 1)[1].lower() in allowed_extension_file_types

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower() #rsplit -> split at the rightmost "." one time
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def upload_to_s3(file):
    try:
        s3.upload_fileobj(
            file, BUCKET_NAME,file.filename,ExtraArgs = {
                "ACL":"public-read",
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        return {"errors":str(e)}
    return {"url":f"{S3_location}{file.filename}"}
