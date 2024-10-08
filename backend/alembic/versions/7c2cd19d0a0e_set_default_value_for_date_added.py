"""Set default value for date_added

Revision ID: 7c2cd19d0a0e
Revises: 74e63b2b2b44
Create Date: 2024-10-04 16:41:08.121209

"""
from alembic import op
import sqlalchemy as sa
from datetime import date

# revision identifiers, used by Alembic.
revision = '7c2cd19d0a0e'
down_revision = '74e63b2b2b44'
branch_labels = None
depends_on = None


def upgrade():
    # Update existing null values
    op.execute("UPDATE books SET date_added = '{}' WHERE date_added IS NULL".format(date.today()))
    
    # Set the column to not null
    op.alter_column('books', 'date_added',
               existing_type=sa.DATE(),
               nullable=False)
    
    # Set default value for future inserts
    op.alter_column('books', 'date_added',
               existing_type=sa.DATE(),
               server_default=sa.text('CURRENT_DATE'),
               existing_nullable=False)


def downgrade():
    op.alter_column('books', 'date_added',
               existing_type=sa.DATE(),
               nullable=True)
    op.alter_column('books', 'date_added',
               existing_type=sa.DATE(),
               server_default=None,
               existing_nullable=True)