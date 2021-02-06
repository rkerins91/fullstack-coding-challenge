from rest_framework import viewsets
from .models import UserProfile, Complaint, User
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class ComplaintViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer

    def list(self, request):
        # Get all complaints from the user's district
        # Get user district from UserProfile
        # user_dist = UserProfile.objects.get(id=request.data["id"])
        # district = UserProfileSerializer(user_dist).data.get('district')
        # Get complaints where account is User's district

        # MAY HAVE TO FILTER ON FRONT END
        # print(request.)
        queryset = Complaint.objects.all()
        serializer = ComplaintSerializer(queryset, many=True)
        return Response(serializer.data)


class OpenCasesViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer

    def list(self, request):
        # Get all complaints from the user's district
        # Get user district from UserProfile
        queryset = Complaint.objects.all().filter(
            closedate=None,
            account="NYCC" + district
        )
        serializer = ComplaintSerializer(queryset, many=True)
        return Response(serializer.data)


class ClosedCasesViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer

    def list(self, request):
        # Get all complaints from the user's district
        # Get user district from UserProfile
        queryset = Complaint.objects.all().exclude(closedate=None)
        serializer = ComplaintSerializer(queryset, many=True)
        return Response(serializer.data)


class TopComplaintTypeViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer

    def list(self, request):
        # Get all complaints from the user's district
        # Get user district from UserProfile
        complaintsMap = {}
        user_dist = UserProfile.objects.get(id=request.data["id"])
        district = UserProfileSerializer(user_dist).data.get('district')
        complaint_types = Complaint.objects.values(
            'complaint_type').filter(complaint_type__isnull=False, account="NYCC" + district)

        # Set each category of different complaint types for each district and count number of each complaint category for each district
        for complaint in complaint_types:
            complaint_type = complaint['complaint_type']
            print(complaint_type)
            if complaint_type not in complaintsMap:
                # print('iffffff')
                complaintsMap[complaint_type] = 1
                print(complaintsMap[complaint_type])
            else:
                # print('elseeeee')
                complaintsMap[complaint_type] += 1
                print(complaintsMap[complaint_type])
        # print(complaintsMap)

        # for complaint in complaintsMap:
        print(complaintsMap)

        # queryset = Complaint.objects.all().filter(
        #     account="NYCC" + request.data['account'])

        # serializer = ComplaintSerializer(queryset, many=True)
        return Response("hi")
