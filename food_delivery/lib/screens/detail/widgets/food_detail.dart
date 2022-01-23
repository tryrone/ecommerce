import 'package:flutter/material.dart';
import 'package:food_delivery/constants/colors.dart';
import 'package:food_delivery/models/food.dart';
import 'package:food_delivery/screens/detail/widgets/food_quantity.dart';

class FoodDetail extends StatelessWidget {
  final Food food;

  FoodDetail(this.food);

  Widget _buildIconText(IconData icon, Color color, String text) {
    return Row(
      children: [
        Icon(icon, color: color, size: 20),
        Text(
          text,
          style: const TextStyle(fontSize: 16),
        )
      ],
    );
  }

  Widget _buildIngredientText(String img, String text) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(40)
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset(img, width: 52),
          Text(
          text,
          style: const TextStyle(
            fontSize: 16
          ),)
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(25),
      height: MediaQuery.of(context).size.height * 0.7,
      color: kBackground,
      child: Column(
        children: [
          Text(
            food.name,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 22),
          ),
          const SizedBox(height: 15),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildIconText(
                  Icons.access_time_outlined, Colors.blue, food.waitTime),
              _buildIconText(
                  Icons.star_outlined, Colors.amber, '${food.score}'),
              _buildIconText(
                  Icons.local_fire_department_outlined, Colors.red, food.cal),
            ],
          ),
          const SizedBox(height: 30),
          FoodQuantity(food),
          const SizedBox(height: 30),
          Row(
            children: const [
              Text(
                'Ingredients',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              )
            ],
          ),
          const SizedBox(height: 10),
          Container(
            height: 100,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemBuilder: (context, index) => _buildIngredientText(food.ingredients[index].values.first,food.ingredients[index].keys.first),
              separatorBuilder: (_, index) => const SizedBox(width: 20),
              itemCount: food.ingredients.length,
            ),
          ),

          const SizedBox(height: 30),

          Row(
          children: const [
            Text('About',
            style: TextStyle(fontWeight: FontWeight.bold , fontSize: 18 ),
            )
          ]),

          const SizedBox(height: 10),

    
            Text(
            food.about,
            style:
            const TextStyle(
              wordSpacing: 1.2,
              height: 1.5,
              fontSize: 16 
              ),
            ),
        ],
      ),
    );
  }
}
