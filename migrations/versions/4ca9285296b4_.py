"""empty message

Revision ID: 4ca9285296b4
Revises: 
Create Date: 2023-10-31 11:10:10.996576

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4ca9285296b4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('genres',
    sa.Column('genre_id', sa.Integer(), nullable=False),
    sa.Column('genre_name', sa.String(length=150), nullable=False),
    sa.PrimaryKeyConstraint('genre_id')
    )
    op.create_table('user',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('lastname', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('profileimg', sa.String(length=400), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('book_goals',
    sa.Column('book_goal_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('number_of_books', sa.Integer(), nullable=False),
    sa.Column('percentage', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('book_goal_id')
    )
    op.create_table('books',
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=150), nullable=False),
    sa.Column('author', sa.String(length=150), nullable=False),
    sa.Column('isbn', sa.String(length=13), nullable=False),
    sa.Column('genre', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=1000), server_default='', nullable=False),
    sa.Column('avg_rating', sa.Float(), nullable=False),
    sa.Column('total_ratings', sa.Integer(), nullable=False),
    sa.Column('cover_img', sa.String(length=500), nullable=False),
    sa.Column('status', sa.Enum('Available', 'Not Available', name='status_type'), nullable=False),
    sa.ForeignKeyConstraint(['genre'], ['genres.genre_id'], ),
    sa.PrimaryKeyConstraint('book_id'),
    sa.UniqueConstraint('isbn')
    )
    op.create_table('friendship',
    sa.Column('friendship_id', sa.Integer(), nullable=False),
    sa.Column('user1_id', sa.Integer(), nullable=False),
    sa.Column('user2_id', sa.Integer(), nullable=False),
    sa.Column('friendship_status', sa.Enum('Accepted', 'Pending', 'Rejected', name='friendship_type'), nullable=False),
    sa.ForeignKeyConstraint(['user1_id'], ['user.user_id'], ),
    sa.ForeignKeyConstraint(['user2_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('friendship_id')
    )
    op.create_table('book_owner',
    sa.Column('book_owner_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['books.book_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('book_owner_id')
    )
    op.create_table('book_recommendations',
    sa.Column('recommendation_id', sa.Integer(), nullable=False),
    sa.Column('user1_id', sa.Integer(), nullable=False),
    sa.Column('user2_id', sa.Integer(), nullable=False),
    sa.Column('recommended_book_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['recommended_book_id'], ['books.book_id'], ),
    sa.ForeignKeyConstraint(['user1_id'], ['user.user_id'], ),
    sa.ForeignKeyConstraint(['user2_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('recommendation_id')
    )
    op.create_table('book_swap_request',
    sa.Column('request_id', sa.Integer(), nullable=False),
    sa.Column('sender_user_id', sa.Integer(), nullable=False),
    sa.Column('receiver_user_id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('request_status', sa.Enum('Accepted', 'Pending', 'Rejected', name='request_type'), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['books.book_id'], ),
    sa.ForeignKeyConstraint(['receiver_user_id'], ['user.user_id'], ),
    sa.ForeignKeyConstraint(['sender_user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('request_id')
    )
    op.create_table('reviews',
    sa.Column('review_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(length=200), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['books.book_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('review_id')
    )
    op.create_table('wishlist',
    sa.Column('wishlist_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['books.book_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('wishlist_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('wishlist')
    op.drop_table('reviews')
    op.drop_table('book_swap_request')
    op.drop_table('book_recommendations')
    op.drop_table('book_owner')
    op.drop_table('friendship')
    op.drop_table('books')
    op.drop_table('book_goals')
    op.drop_table('user')
    op.drop_table('genres')
    # ### end Alembic commands ###
