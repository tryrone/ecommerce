import 'package:flutter/material.dart';
import 'package:food_delivery/constants/colors.dart';
import 'package:food_delivery/models/restaurant.dart';
import 'package:food_delivery/screens/home/widget/food_list.dart';
import 'package:food_delivery/screens/home/widget/food_list_view.dart';
import 'package:food_delivery/screens/home/widget/resturant_info.dart';
import 'package:food_delivery/widgets/custom_app_bar.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  var selected = 0;
  final pageController = PageController();
  final restaurant = Restaurant.generateResturant();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kBackground,
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CustomAppBar(Icons.arrow_back_ios_outlined, Icons.search_outlined),
          RestaurantInfo(),
          FoodList(selected, (int index) {
            setState(() {
              selected = index;
            });
            pageController.jumpToPage(index);
          }, restaurant),
          Expanded( 
            child: FoodListView(
              selected, 
              (int index) {
              setState(() {
                selected = index;
              }); 
              },
              pageController,
              restaurant
            ),
          ),

          Container(
            height: 60,
            padding: EdgeInsets.symmetric(horizontal: 25),
            child: SmoothPageIndicator(
                controller: pageController,
                count: restaurant.menu.length,
                effect: CustomizableEffect(
                  dotDecoration: DotDecoration(
                    width:8,
                    height:8,
                    borderRadius: BorderRadius.circular(8 * 0.5),
                    color: Colors.grey.withOpacity(0.5),
                  ), 
                  activeDotDecoration: DotDecoration(
                    width:10,
                    height:10,
                    borderRadius: BorderRadius.circular(10 * 0.5),
                    color: kBackground,
                    dotBorder: DotBorder(
                      color:  kPrimaryColor,
                      width: 2,
                      padding: 2,
                    )
                  ), 
                  ),
                onDotClicked: (int index) => pageController.jumpToPage(index),
              ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: (){},
        backgroundColor: kPrimaryColor,
        elevation: 2,
        child: const Icon(
          Icons.shopping_bag_outlined , 
          color: Colors.black, 
          size: 30
          ),
      ),
    );
  }
}
