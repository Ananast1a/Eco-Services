import os
from dotenv import load_dotenv

from sorting_app.db import db
from sorting_app import create_app

# we need import all models explicitly
from sorting_app.models.service import Service
from sorting_app.models.waste import Waste
from sorting_app.models.user import User
from sorting_app.models.question import Question

load_dotenv()  # take environment variables from .env.
app = create_app(os.environ.get('CONFIGURATION'))


def populate_database():
    """
    Populate database with services and wastes
    :return: None
    """
    with app.app_context():
        # Drop all the existing database tables
        db.drop_all()

        # Create the database and the database table
        db.create_all()

    service_1 = Service(
        'OAK service',
        'Remeslennaya Street, 7, St. Petersburg, Russia, 197110',
        [59.96000898377962, 30.2681464833422406],
        'Monday-Friday   9 a.m - 5 p.m',
        5,
        ['plastic', 'metal', 'glass', 'paper'],
        True,
        False,
        'ecooak@eco.com',
        '+7 (812) 634-49-15',
        'https://st.depositphotos.com/1000940/2811/v/600/depositphotos_28113985-stock-illustration-vector-recycle-signs-and-symbols.jpg'
    )

    service_2 = Service(
        'Poplar service',
        'Vyborg Avenue, 212, с11, St. Petersburg, Russia, 194362',
        [60.07061980027474, 30.287834531223186],
        'Monday-Friday   9 a.m - 5 p.m',
        5,
        ['plastic', 'metal', 'glass', 'paper'],
        True,
        False,
        'ecopoplar@eco.com',
        '+7 (812) 634-49-15',
        'https://gidpomusoru.ru/wp-content/uploads/2021/02/biodegradable-arrows-vector-icons-set.jpg'
    )

    service_3 = Service(
        'Willow service',
        '96, Umanskiy Pereulok, 1, St. Petersburg, Russia',
        [59.97059878136925, 30.449213033069714],
        'Monday-Friday   9 a.m - 5 p.m',
        5,
        ['plastic', 'metal', 'glass', 'paper'],
        True,
        False,
        'ecowillow@eco.com',
        '+7 (812) 634-49-15',
        'https://promusor.info/wp-content/uploads/2020/02/znaki-i-kody-vtorichnoj-pererabotki-1.jpg'
    )

    service_4 = Service(
        'ASH serviсe',
        'Sofiyskaya Street, 91, St. Petersburg, Russia, 192289',
        [59.84136993376726, 30.432761556352776],
        'Monday-Friday   9 a.m - 5 p.m',
        5,
        ['plastic', 'metal', 'glass', 'paper'],
        True,
        False,
        'ecoASH@eco.com',
        '+7 (812) 634-49-15',
        'https://nikatv.ru/public/user_upload/files/2019/02/untitled.jpg'
    )

    service_5 = Service(
        'Global cleaning',
        'Tramvaynyy Avenue, 32б, St. Petersburg, Russia, 192007',
        [59.854585473720185, 30.283899014024453],
        'Monday-Friday   9 a.m - 5 p.m',
        5,
        ['plastic', 'metal', 'glass', 'paper'],
        False,
        False,
        'ecoGlobal@eco.com',
        '+7 (812) 701-09-51',
        'http://kray31.ru/wp-content/uploads/2019/07/beeb0c8c1da035be5ca228bb5f17c1e8.jpg'
    )

    service_6 = Service(
        'Element service',
        'Aleksandrovskoy Fermy Avenue, 29B, St. Petersburg, Russia',
        [59.85393697945137, 30.4374616870384],
        'Monday-Friday   9 a.m - 5 p.m',
        5,
        ['plastic', 'metal', 'glass', 'paper'],
        False,
        False,
        'ecoElement@eco.com',
        '+7 (812) 634-49-15',
        'https://thumb.tildacdn.com/tild6131-6333-4438-b861-313962646361/-/resize/744x/-/format/webp/'
        '10330757_l1024x7411.jpg'
    )

    service_7 = Service(
        'Dubok - PPS of the Ubirator company',
        'Remeslennaya Street, 7G, St. Petersburg, Russia',
        [59.960354, 30.266604],
        'Monday-Friday   9 a.m - 9 p.m',
        5,
        ['plastic', 'metal', 'paper'],
        True,
        True,
        'order@ubirator.com',
        '+7 (495) 181-00-97',
        'https://americanbutler.ru/uploads/images/useful/lifehacks/recycling/recycling-01.jpg'
    )

    service_8 = Service(
        'Yasen - PPS of the Ubirator company',
        'Sofiyskaya Street, 91T, St. Petersburg, Russia',
        [59.839212, 30.432469],
        'Monday-Friday   9 a.m - 5 p.m',
        5,
        ['plastic', 'metal', 'paper'],
        True,
        True,
        'order@ubirator.com',
        '+7 (812) 634-49-15',
        'https://s3-us-west-2.amazonaws.com/cbi-image-service-prd/original/42063202-fb26-4569-84e9-66954e7dd4d8.png'
    )

    waste_1 = Waste(
        'Plastic',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Plastic-recyc-01.svg/120px-Plastic-recyc-01.svg.png'
        '01 PET (PETF) - polyethylene terephthalate',
        'yes',
        'https://www.agvu.de/wp-content/uploads/2016/09/PET.jpg',

        '1) Bottles with a convex point at the bottom\n'
        '2) Bottles for water, juices, soft drinks and vegetable oils\n'
        '3) Clear shampoo bottles, disposable food containers, canisters',

        'In order to hand over plastic products, they must be sorted by the type of material from which it is made '
        'since they are processed under different conditions. Plastic waste and also caps must be cleaned of '
        'organic residues before visiting the recycling center. Plastic bottles need to be cleaned from '
        'the shrink films, easily removable cardboard and dispensers and crush.'
    )

    waste_2 = Waste(
        'Plastic',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Plastic-recyc-02.svg/120px-Plastic-recyc-02.svg.png'
        '02 HDPE (PEND) - high density polyethylene (low pressure)',
        'yes',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRrGdqGvJePa-_Z4X-3BaB17wGadpEk-TlMGTwM5Gl0khfF3ARzCIw'
        '-3NjNIw-Gv5kT78&usqp=CAU',

        '1) There is a characteristic "seam" on the bottom\n'
        '2) Milk bottles, cans, bottle caps, bottles for cosmetics and household chemicals, canisters\n',

        'In order to hand over plastic products, they must be sorted by the type of material from which it is made '
        'since they are processed under different conditions. Plastic waste and also caps must be cleaned of '
        'organic residues before visiting the recycling center. Plastic bottles need to be cleaned from '
        'the shrink films, easily removable cardboard and dispensers and crush.'
    )

    waste_3 = Waste(
        'Plastic',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Plastic-recyc-03.svg/120px-Plastic-recyc-03.svg.png',
        '03 PVC - polyvinyl chloride',
        'Non-recyclable',
        'https://5.imimg.com/data5/IL/QE/MY-4317158/pe-zipper-bag-250x250.jpg',

        "1) Floor and window coverings, oilcloth\n"
        "2) Packaging for detergents, blisters\n"
        "3) Packaging for tablets, as well as cakes and cottage cheese, shrink wrap\n"
        "4) Bottles for cosmetics, toys\n",

        'In order to hand over plastic products, they must be sorted by the type of material from which it is made '
        'since they are processed under different conditions. Plastic waste and also caps must be cleaned of '
        'organic residues before visiting the recycling center. Plastic bottles need to be cleaned from '
        'the shrink films, easily removable cardboard and dispensers and crush.'
    )

    waste_4 = Waste(
        'Plastic',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Plastic-recyc-04.svg/120px-Plastic-recyc-04.svg.png',
        '04 LDPE (PELD) - low density polyethylene',
        'yes',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Plastic-recyc-01.svg/120px-Plastic-recyc-01.svg.png',

        "1) Bags that we find in the supermarket at the checkout\n"
        "2) Cling film, trash bags\n"
        "3) Tarps, linoleum\n",

        'In order to hand over plastic products, they must be sorted by the type of material from which it is made '
        'since they are processed under different conditions. Plastic waste and also caps must be cleaned of '
        'organic residues before visiting the recycling center. Plastic bottles need to be cleaned from '
        'the shrink films, easily removable cardboard and dispensers and crush.'
    )

    waste_5 = Waste(
        'Plastic',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Plastic-recyc-05.svg/120px-Plastic-recyc-05.svg.png'
        '05 PP - polypropylene',
        'yes',
        'https://images.ua.prom.st/1268542194_kryshka-dlya-pet.jpg',

        "1) Interior decoration of cars\n"
        "2) Toys, disposable tableware, bottle caps, buckets\n"
        "3) Yogurt cups, lens packaging, rustling plastic packaging\n",

        'In order to hand over plastic products, they must be sorted by the type of material from which it is made '
        'since they are processed under different conditions. Plastic waste and also caps must be cleaned of '
        'organic residues before visiting the recycling center. Plastic bottles need to be cleaned from '
        'the shrink films, easily removable cardboard and dispensers and crush.'
    )

    waste_6 = Waste(
        'Plastic',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Plastic-recyc-06.svg/120px-Plastic-recyc-06.svg.png',
        '06 PS - polystyrene',
        'Non-recyclable',
        'https://images.ua.prom.st/1042653219_1042653219.jpg',

        "1) Styrofoam, egg containers, CD packaging\n"
        "2) Some disposable utensils, fruit and vegetable boxes\n",

        'In order to hand over plastic products, they must be sorted by the type of material from which it is made '
        'since they are processed under different conditions. Plastic waste and also caps must be cleaned of '
        'organic residues before visiting the recycling center. Plastic bottles need to be cleaned from '
        'the shrink films, easily removable cardboard and dispensers and crush.'
    )

    waste_7 = Waste(
        'Plastic',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Plastic-recyc-07.svg/120px-Plastic-recyc-07.svg.png',
        '07 - OTHER (or may be missing)',
        'Non-recyclable',
        'https://yes-upak.ru/img/upakovka-dlja-kosmetiki/upakovka-dlja-kosmetiki-aso.jpg',

        "1) Packaging for cheese, coffee, pet food\n"
        "2) Solid containers for cosmetics\n"
        "3) Toys and bottles for children\n",

        'In order to hand over plastic products, they must be sorted by the type of material from which it is made '
        'since they are processed under different conditions. Plastic waste and also caps must be cleaned of '
        'organic residues before visiting the recycling center. Plastic bottles need to be cleaned from '
        'the shrink films, easily removable cardboard and dispensers and crush.'
    )

    waste_8 = Waste(
        'Plastic',
        'https://techhowtodo.com/wp-content/uploads/2020/01/d2w-logo.png',
        'Oxo-degradable plastic',
        'Non-recyclable',
        'https://ua.all.biz/img/ua/catalog/2260821.jpeg',

        "1) Plastic packaging, single-use bags\n",

        'In order to hand over plastic products, they must be sorted by the type of material from which it is made '
        'since they are processed under different conditions. Plastic waste and also caps must be cleaned of '
        'organic residues before visiting the recycling center. Plastic bottles need to be cleaned from '
        'the shrink films, easily removable cardboard and dispensers and crush.'
    )

    waste_9 = Waste(
        'Tetra Pak/Pure Pak',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Recycling-Code-84.svg/120px-Recycling-Code-84.'
        'svg.png',
        '84 - С/PAP',
        'Yes',
        'https://s7g10.scene7.com/is/image/tetrapak/Explore-Package-Portfolio-2?wid=384&hei=216&fmt=jpg&resMode='
        'sharp2&qlt=85,0&op_usm=1.75,0.3,2,0',

        "1) Multilayer packaging made of paper, plastic and aluminum\n"
        "2) Boxes for juice and milk, tubes for chips\n",

        'Tetra Pak and Pure Pak need to be cleaned from shrink films, easily removable cardboard, dispensers and crush.'
    )

    waste_10 = Waste(
        'Paper',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Recycling_Codes_Paper_22_PAP.svg/240px-'
        'Recycling_Codes_Paper_22_PAP.svg.png',
        '20-22 (PAP) - paper and cardboard (or may be missing)',
        'Yes',
        'https://varash-rada.gov.ua/images/5ad5ff2f7a6af.jpg',

        "1) Boxes from household appliances, food, cosmetics\n"
        "2) Postcards, book covers, magazines and newspapers\n"
        "3) Envelopes, paper bags, printing paper\n",

        'Before handing over the paper / waste paper, remove the metal and plastic elements. Paper should be packed '
        'and bandaged, boxes should be folded. It is advisable to separate cardboard, newspapers and other '
        'paper by type. Corrugated cardboard must be handed over disassembled.'
    )

    waste_11 = Waste(
        'Metal',
        'https://kray31.ru/wp-content/uploads/2019/02/800px-recycling-code-40.svg_-150x150.png',
        '40 (FE) - tinplate (or may be missing)',
        'Yes',
        'https://img.novobyt.ru/images/p/ad/ad6a5530-6a29-47fc-b19b-1a64a602083f.jpg',

        "1) Cans, glass jar lids\n"
        "2) Non-ferrous and ferrous metal\n"
        "3) Aerosol cans (not all)\n",

        'Metal waste must be cleaned of organic residues before visiting the recycling center'
    )

    waste_12 = Waste(
        'Metal',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Recycling-Code-41.svg/120px-Recycling-Code-41.'
        'svg.png',
        '40 (FE) - tinplate (or may be missing)',
        'Yes',
        'https://images.ua.prom.st/1051730747_w700_h500_alyuminievye-banki-iz.jpg',

        "1) Beverage cans and foil, aluminum cans\n",
        'Metal waste must be cleaned of organic residues before visiting the recycling center'
    )

    waste_13 = Waste(
        'Glass',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Recycling-Code-70.svg/240px-Recycling-Code-70.',
        '70–74 (GL) - glass and glass containers (or may be missing)',
        'Yes',
        'https://tkp74.ru/sites/default/files/90.jpg',

        "1) Colorless transparent, green, brown, light brown and dark brown bottle glass\n",
        'Glass waste must be cleaned of organic residues before visiting the recycling center.'
    )

    waste_14 = Waste(
        'Dangerous waste',
        'https://svswa.org/svswauploads/noTrash.jpg',
        '40 (FE) - tinplate (or may be missing)',
        'Special recycling',
        'https://www.takefoto.ru/img/articles/big_f0kkvjie.jpg',

        "1) Batteries and accumulators\n"
        "2) Mercury-containing lamps and devices (thermometers, barometers, tonometers)\n"
        "3) Medical waste, pesticides, residues of paints, varnishes\n"
        "4) Computer equipment, office equipment\n"
        "5) Batteries from mobile phones, laptops\n",
        'Dangerous waste should be taken to special points intended for their reception'
    )

    with app.app_context():
        db.session.add(service_1)
        db.session.add(service_2)
        db.session.add(service_3)
        db.session.add(service_4)
        db.session.add(service_5)
        db.session.add(service_6)
        db.session.add(service_7)
        db.session.add(service_8)

        db.session.add(waste_1)
        db.session.add(waste_2)
        db.session.add(waste_3)
        db.session.add(waste_4)
        db.session.add(waste_5)
        db.session.add(waste_6)
        db.session.add(waste_6)
        db.session.add(waste_7)
        db.session.add(waste_8)
        db.session.add(waste_9)
        db.session.add(waste_10)
        db.session.add(waste_11)
        db.session.add(waste_12)
        db.session.add(waste_13)
        db.session.add(waste_14)

        db.session.commit()


if __name__ == '__main__':
    print('Populating database...')
    populate_database()
    print('Successfully populated')
