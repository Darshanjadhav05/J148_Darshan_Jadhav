class Circle {
    double radius;
    Circle(double r) { radius = r; }
}
public class Circle_Main {

	public static void main(String[] args) {
		 Circle c = new Circle(7);
	     System.out.println("Area: " + (Math.PI * c.radius * c.radius));
	     System.out.println("Circumference: " + (2 * Math.PI * c.radius));

	}

}
