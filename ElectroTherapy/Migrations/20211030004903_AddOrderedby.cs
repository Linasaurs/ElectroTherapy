using Microsoft.EntityFrameworkCore.Migrations;

namespace ElectroTherapy.Migrations
{
    public partial class AddOrderedby : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderedById",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OrderedById",
                table: "Orders",
                column: "OrderedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Customers_OrderedById",
                table: "Orders",
                column: "OrderedById",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Customers_OrderedById",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_OrderedById",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderedById",
                table: "Orders");
        }
    }
}
