import { Injectable } from "@angular/core";
import { WasteItemSubtype } from "src/app/waste-item-subtype/waste-item-subtype.model";
import { WasteItem } from "src/app/waste-item/waste-item.model";
import { WasteType } from "src/app/waste-type/waste-type.model";


@Injectable({ providedIn: 'root' })

export class DataStorageService {

    wasteTypes: WasteType[] = [
        new WasteType('Plastic', [
            new WasteItem('https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Plastic-recyc-01.svg/120px-Plastic-recyc-01.svg.png', '01 PET (PETF) - polyethylene terephthalate', [
                new WasteItemSubtype(
                    'Yes',
                    ['Bottles with a convex point at the bottom',
                        'Bottles for water, juices, soft drinks and vegetable oils',
                        'Clear shampoo bottles, disposable food containers, canisters'],
                    ['https://www.agvu.de/wp-content/uploads/2016/09/PET.jpg'
                    ]
                ),
                new WasteItemSubtype(
                    'Not all these plastics are recyclable, needs to be clarified in a specific eco service',
                    ['Colored opaque white, yellow, black bottles'],
                    ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_xM4m8xalEG_om86EmzJFnA7UROdFY4P57m5ueciQkIIzlZAAedcLITIyJLjOkRpV2Fk&usqp=CAU',
                    ]
                )
            ]),
            new WasteItem('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Plastic-recyc-02.svg/120px-Plastic-recyc-02.svg.png', '02 HDPE (PEND) - high density polyethylene (low pressure)', [
                new WasteItemSubtype(
                    'Yes',
                    ['There is a characteristic "seam" on the bottom',
                        'Milk bottles, cans, bottle caps, bottles for cosmetics and household chemicals, canisters'],
                    ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRrGdqGvJePa-_Z4X-3BaB17wGadpEk-TlMGTwM5Gl0khfF3ARzCIw-3NjNIw-Gv5kT78&usqp=CAU'
                    ]
                )
            ]),
            new WasteItem('https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Plastic-recyc-03.svg/120px-Plastic-recyc-03.svg.png', '03 PVC - polyvinyl chloride', [
                new WasteItemSubtype(
                    'Non-recyclable',
                    ['Floor and window coverings, oilcloth',
                        'Packaging for detergents, blisters',
                        'Packaging for tablets, as well as cakes and cottage cheese, shrink wrap',
                        'Bottles for cosmetics, toys'],
                    ['https://hq2.recyclist.co/wp-content/uploads/sites/2/2015/02/blister-pack-300x300.jpg',
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp88oanGZlOIs-2BInHh614UYzQO4NocFA0MPD7hYq1OMe6ltpfuvDpXmCp2mJBC0WpO4&usqp=CAU'
                    ]
                )
            ]),
            new WasteItem('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Plastic-recyc-04.svg/120px-Plastic-recyc-04.svg.png', '04 LDPE (PELD) - low density polyethylene', [
                new WasteItemSubtype(
                    'Yes',
                    ['Bags that we find in the supermarket at the checkout',
                        'Cling film, trash bags',
                    'Tarps, linoleum'],
                    ['https://5.imimg.com/data5/IL/QE/MY-4317158/pe-zipper-bag-250x250.jpg',
                    'https://m.media-amazon.com/images/I/61RPigdJuwL._AC_SX355_.jpg'
                    ]
                )
            ]),
            new WasteItem('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Plastic-recyc-05.svg/120px-Plastic-recyc-05.svg.png', '05 PP - polypropylene', [
                new WasteItemSubtype(
                    'Yes',
                    ['Interior decoration of cars',
                        'Toys, disposable tableware, bottle caps, buckets',
                        'Yogurt cups, lens packaging, rustling plastic packaging'],
                    ['https://images.ua.prom.st/1268542194_kryshka-dlya-pet.jpg',
                    'https://agripak.com/sites/default/files/portfolio/yogurtcup.jpg'
                    ]
                )
            ]),
            new WasteItem('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Plastic-recyc-06.svg/120px-Plastic-recyc-06.svg.png', '06 PS - polystyrene', [
                new WasteItemSubtype(
                    'Non-recyclable',
                    ['Styrofoam, egg containers, CD packaging',
                        'Some disposable utensils, fruit and vegetable boxes'],
                    ['https://ae01.alicdn.com/kf/H9c2308a5446744df89c5a72e6326853e9/Hen-Egg-Trays-30-Hole-Paper-Flats-Chicken-Cardboard-Egg-Cartons-Hatching-Craft-Poultry-Egg-Tray.jpg_Q90.jpg_.webp',
                    'https://images.ua.prom.st/1042653219_1042653219.jpg'
                    ]
                )
            ]),
            new WasteItem('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Plastic-recyc-07.svg/120px-Plastic-recyc-07.svg.png', '07 - OTHER (or may be missing)', [
                new WasteItemSubtype(
                    'Non-recyclable',
                    ['Packaging for cheese, coffee, pet food',
                        'Solid containers for cosmetics',
                        'Toys and bottles for children'],
                    ['https://yes-upak.ru/img/upakovka-dlja-kosmetiki/upakovka-dlja-kosmetiki-aso.jpg',
                    'https://everydayrecycler.com/wp-content/uploads/2020/04/Plastic-number-7-3.jpg'
                    ]
                )
            ]),
            new WasteItem('https://techhowtodo.com/wp-content/uploads/2020/01/d2w-logo.png', 'Oxo-degradable plastic ', [
                new WasteItemSubtype(
                    'Non-recyclable',
                    ['Plastic packaging, single-use bags'],
                    ['https://ua.all.biz/img/ua/catalog/2260821.jpeg',
                    'https://novoplast.ua/assets/templates/1/pakety/seria.jpg'
                    ]
                )
            ]),
        ],
            'Plastic products should be sorted by the type of material which they are made of, since they are processed under different conditions. Plastic waste and caps should be cleaned from organic residues before reaching the recycling center. Plastic bottles should be cleaned from shrink films, easily removable cardboard, dispensers and crush. Non-recyclable waste is disposed of in a garbage chute or general waste container. Then the garbage is taken out to the household waste landfill and / or to the facilities responsible for its disposal.'),

        new WasteType('Tetra Pak/Pure Pak', [
            new WasteItem('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Recycling-Code-84.svg/120px-Recycling-Code-84.svg.png', '84 - С/PAP', [
                new WasteItemSubtype(
                    'Yes',
                    ['Multilayer packaging made of paper, plastic and aluminum',
                    'Boxes for juice and milk, tubes for chips'],
                    ['https://s7g10.scene7.com/is/image/tetrapak/Explore-Package-Portfolio-2?wid=384&hei=216&fmt=jpg&resMode=sharp2&qlt=85,0&op_usm=1.75,0.3,2,0',
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Tetra_Pak_packaging_portfolio_I_medium_size.jpg/274px-Tetra_Pak_packaging_portfolio_I_medium_size.jpg',
                    ]
                ),
            ])
        ], 'Tetra Pak and Pure Pak need to be cleaned from shrink films, easily removable cardboard, dispensers and crush.'),
        
        new WasteType('Paper', [
            new WasteItem('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Recycling_Codes_Paper_22_PAP.svg/240px-Recycling_Codes_Paper_22_PAP.svg.png', '20-22 (PAP) - paper and cardboard (or may be missing)', [
                new WasteItemSubtype(
                    'Yes',
                    ['Boxes from household appliances, food, cosmetics', 
                    'Postcards, book covers, magazines and newspapers',
                    'Envelopes, paper bags, printing paper'],
                    ['https://varash-rada.gov.ua/images/5ad5ff2f7a6af.jpg',
                    'https://informupack.ru/upload/iblock/4a0/4a035438ac9f9a7c0246f509fef0bceb.jpg'
                    ]
                ),
                new WasteItemSubtype(
                    'Non-recyclable',
                    ['Cash receipts, toilet paper, napkins, subway cards',
                    'Disposable “paper” coffee cups, cigarette packs, egg trays',
                    'Wallpaper, photo paper, baking paper, tracing paper, laminated paper'],
                    ['https://prostonail.com/wp-content/uploads/2018/12/receipts-800x533.jpg',
                    'https://images.ru.prom.st/918837307_bumazhnye-stakany-250ml.jpg'
                    ]
                ),
            ])
        ], 'Before handing over the paper / waste paper, remove metal and plastic elements. Paper should be packed and bandaged, boxes should be folded. It is advised to separate cardboard, newspapers and other paper by type. Corrugated cardboard must be handed over disassembled.'),

        new WasteType('Metal', [
            new WasteItem('https://kray31.ru/wp-content/uploads/2019/02/800px-recycling-code-40.svg_-150x150.png', '40 (FE) - tinplate (or may be missing)', [
                new WasteItemSubtype(
                    'Yes',
                    ['Cans, glass jar lids',
                    'Non-ferrous and ferrous metal',
                    'Aerosol cans (not all)'],
                    ['https://img.novobyt.ru/images/p/ad/ad6a5530-6a29-47fc-b19b-1a64a602083f.jpg',
                    'https://w7.pngwing.com/pngs/67/1014/png-transparent-metal-box-packaging-and-labeling-canning-tin-can-box-miscellaneous-food-food-packaging.png'
                    ]
                ),
                new WasteItemSubtype(
                    'Not all metal products are accepted',
                    ['Spray cans from tear gas and polyurethane foam'],
                    ['https://s.alicdn.com/@sc04/kf/H9f9b7feef5ae477d951d5120cd95f8c5h.jpg_300x300.jpg',
                    'https://express-china.ru/upload/iblock/9f0/phprVzUjK.jpg',
                    ]
                )
            ]),
            new WasteItem('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Recycling-Code-41.svg/120px-Recycling-Code-41.svg.png', '41 (ALU) - aluminum', [
                new WasteItemSubtype(
                    'Yes',
                    ['Beverage cans and foil, aluminum cans'],
                    ['https://images.ua.prom.st/1051730747_w700_h500_alyuminievye-banki-iz.jpg',
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLz_F4JHw5V2Ujh2rsROYqBdEg6ost8asVZsCQvf3HwcYmAXoqPeUcdpaZsuDtcK3LTx0&usqp=CAU'
                    ]
                )
            ])

        ], 'Metal waste must be cleaned of organic residues before reaching recycling center.'),

        new WasteType('Glass', [
            new WasteItem('https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Recycling-Code-70.svg/240px-Recycling-Code-70.svg.png', '70–74 (GL) - glass and glass containers (or may be missing)', [
                new WasteItemSubtype(
                    'Yes',
                    ['Colorless transparent, green, brown, light brown and dark brown bottle glass'],
                    ['https://tkp74.ru/sites/default/files/90.jpg',
                    ]
                ),
                new WasteItemSubtype(
                    'Non-recyclable',
                    ['Automobile and window glass',
                    'Window and furniture glass, glass from fireplaces',
                    'Faience, crystal and earthenware',
                    'Porcelain',
                    'Lead-based crystal',
                    'Lamps',
                    'Screens of monitors and computers, television picture tubes',
                    'Mirrors',
                    'Light bulbs'],
                    ['https://m.amnews.com/wp-content/uploads/sites/41/2020/02/0215-Antiques.jpg',
                    'https://www.paulmann.ru/upload/iblock/1ed/lyuminestsentnye_energosberegayushchie_lampy.png',
                    'https://lh3.googleusercontent.com/proxy/ct6J-IfED0dB4x6kv-LBAWVxzX7MQf4OMBPFfNK3YYsNPTxuFd08EGOB3gYda5HabbMJVtb6YjD1hcIJpKG_PowlNA',
                    'https://4tololo.ru/sites/default/files/images/20150810171113.jpg'
                    ]
                )
            ])
        ], 'Glass waste should be cleaned from organic residues before reaching recycling center. Metal caps and rings should be removed from glass containers.'),

        new WasteType('Dangerous waste', [
            new WasteItem('https://svswa.org/svswauploads/noTrash.jpg', 'Crossed-out trash can', [
                new WasteItemSubtype(
                    'Special recycling',
                    ['Batteries and accumulators',
                    'Mercury-containing lamps and devices (thermometers, barometers, tonometers)',
                    'Medical waste, pesticides, residues of paints, varnishes',
                    'Computer equipment, office equipment',
                    'Batteries from mobile phones, laptops'],
                    ['https://videohive.img.customer.envatousercontent.com/files/c2d7fb00-c1fe-4e99-8c55-f9ef21b6f144/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=792a20ee7a6305717619d10cf2d83c42',
                    'https://www.unn.com.ua/uploads/news/2017/11/14/14be6da126a4a181d6d57cfcfb0bea14c1d20f7c.jpg',
                    'https://www.takefoto.ru/img/articles/big_f0kkvjie.jpg',
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwhQBl9DJZuukUH9PPCEQJSUzzUTu6yHc0mFDrLT7DftXV9uAISeNhJkxzqkzsTlFdrFU&usqp=CAU',
                    ]
                ),
            ])
        ], 'Dangerous waste should be taken to special points intended for their reception'),


        new WasteType('Food waste, organic', [
            new WasteItem('https://cdn.shopify.com/s/files/1/0023/0323/0025/files/20200608_203042.png?height=628&pad_color=ffffff&v=1617899476&width=1200', 'None', [
                new WasteItemSubtype(
                    'Special recycling',
                    ['Products or their parts (vegetable peeling and trimming, waste of meat products, fish and poultry, flour products, bones and other inedible parts of products), which for some reason did not become food, but went for disposal'],
                    ['https://ec.europa.eu/jrc/sites/default/files/styles/normal-responsive/public/food_waste_by_victoria_m_adobestock_290796363.jpeg?itok=iORhy85_'
                    ]
                ),
            ])
        ], 'To get rid of this waste, you can: take it to special trash can outdoors (with a two-container system - a gray or black container), send to the garbage chute, take to the country house for composting, purchase a disposer - a device for disposing food waste at home.'),

        new WasteType('Bulk waste', [
            new WasteItem('https://cdn.shopify.com/s/files/1/0023/0323/0025/files/20200608_203042.png?height=628&pad_color=ffffff&v=1617899476&width=1200', 'None', [
                new WasteItemSubtype(
                    'Special recycling',
                    ['Old furniture, household appliances and other bulky waste'],
                    ['https://i.pinimg.com/originals/1b/fb/24/1bfb24c29f0448ef2566a5f91ebfdc4c.jpg'
                    ]
                ),
            ])
        ], 'Such garbage can be taken to the collection points for construction waste or taken out to a compartment specially designated for such waste at the yard container site. If there is a lot of rubbish or there is no such compartment, then you should order a vehicle from your housing office, which will take the garbage to the landfill.'),
    ]

    getWasteTypes() {
        return this.wasteTypes.slice();
    }
}