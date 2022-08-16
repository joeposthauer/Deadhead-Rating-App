#include <iostream>

using namespace std;

int main() {


    double x = 0;
    for (double i=1; i < 51; i++) {
        x+=(1/i);
    }

    cout << x << endl;
    double print = (10/x);

    cout << print;

    return 0;
}
