from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        fName='demo', discordHandle='Demo#9991', profilePhoto='https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2021/04/discord-logo.jpg', email='demo@aa.io', password='password')
    marnie = User(
        fName='marnie', discordHandle='Marnie#1234', profilePhoto='https://www.howtogeek.com/wp-content/uploads/2021/07/Discord-Logo-Lede.png?height=200p&trim=2,2,2,2', email='marnie@aa.io', password='password')
    bobbie = User(
        fName='bobbie', discordHandle='Bobbie#5432', profilePhoto='https://better-default-discord.netlify.app/Icons/Gradient-Red.png', email='bobbie@aa.io', password='password')
    jake = User(
        fName='jake', discordHandle='Payneless#0001', profilePhoto='https://cdn.discordapp.com/attachments/920440490548146189/927357822616879114/61a225f12c3c5d774fa7741d78d9b074--guitar-hero-rock-on.jpg', email='payne96@live.com', password='Cloud9')
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(jake)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
